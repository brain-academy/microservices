import cookieParser from 'cookie-parser'
import express, {Express, NextFunction, Request, Response} from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import path from 'path'
import index_router from './src/routes/index'
import userController from 'user-rest'
import cors from 'cors'

let app: Express = express()
const port = 3000

// view engine setup
app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'jade')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())
app.use('/', index_router)
app.use('/users', userController)

// catch 404 and forward to error handler
app.use((_request: Request, _response: Response, next: NextFunction) => next(createError(404)))

// error handler
app.use((err: {message: string, status: number}, request: Request, response: Response) => {
    // set locals, only providing error in development
    response.locals.message = err.message
    response.locals.error = request.app.get('env') === 'development' ? err : {}

    // render the error page
    response.status(err.status || 500)
    response.render('error')
})

app.listen(port, () => console.log(`Node service listening at http://localhost:${port}`))

export default app
