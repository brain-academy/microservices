import express, {Request, Response} from 'express'

let index_router = express.Router();

// let db = pgp('postgres://postgres:passwd@postgres:5432/postgres')

/* GET home page. */
export default index_router.get('/', (_: Request, response: Response) => {
  response.render('index', { title: 'Express' });
});

index_router.get('/person', (_: Request, response: Response) => {
	// let people = db.one('SELECT * from person')
	// 	.then(people => console.log({people}))
	// 	.catch(error => console.log('Connection error'))
	response.render('index', { title: 'get Person' })
});
