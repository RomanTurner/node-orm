import db from '../db';
import {returnClause} from './returnClause';
import {replColors} from '../../repl/replColors';

export interface returningProp {
  isReturning: boolean;
  returnValues: Array<string> | null;
}

interface transactionProps {
  queryText: string;
  values: Array<string>;
  returning: returningProp;
}

const transactionQueryText = ({
  queryText,
  returning: {isReturning, returnValues},
}: Omit<transactionProps, 'values'>) => {
  if (returnValues === null) return `${queryText}`.trim();
  return `${queryText} ${isReturning ? returnClause(returnValues) : ''}`.trim();
};

const transaction = async ({
  queryText,
  values,
  returning,
}: transactionProps) => {
  const client = await db.getClient();
  const init = async () => {
    try {
      await client.query('BEGIN');
      const qt = transactionQueryText({queryText, returning});
      console.log(replColors.FgBlue, `BEGIN: ${qt}`);
      const res = await client.query(qt, values);
      await client.query('COMMIT');
      console.log(replColors.FgGreen, 'COMMITTED');
      return res;
    } catch (error) {
      await client.query('ROLLBACK');
      console.log(replColors.FgYellow, 'ROLLBACK');
      throw error;
    } finally {
      client.release();
      console.log(replColors.FgCyan, 'Pool drained.');
    }
  };
  const result = await init().catch(e =>
    console.error(replColors.FgRed, e.stack)
  );
  return result;
};

export default transaction;
