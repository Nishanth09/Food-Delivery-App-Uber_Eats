const MYSQL_HOST = "localhost";
const MYSQL_PORT = "3307";
const MYSQL_PASSWORD = "dummy";
const MYSQL_DATABASE = "cmpe273";
const MYSQL_USER = "dummy";

const BASE_API_URL = "/api"
const MODE = "dev"

//Load this from env variable please don't use this
const SESSION_SECRET = "asdfshdifsjdf234234ifdjskdfj832498"
const SESSION_KEY = "cmpe273_session_key"

const STATIC_PATH = "./app/static"


module.exports = {
    MYSQL_DATABASE,
    MYSQL_PASSWORD,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    SESSION_SECRET,
    SESSION_KEY,
    MODE,
    BASE_API_URL,
    STATIC_PATH
}