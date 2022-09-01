To run the db you have to have a connection to postgres with a database initialized by the name of dequeue_db.

Change out the user / password to reflect your local environment.

we export db, which is our pool that is wrapped. We can log our executed queries this way for debugging purpose.

This way we can also make sure we are not flooding the pool with too many connections or getting memory leaks. I hope. 
