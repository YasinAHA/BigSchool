import logging

# Configración básica del logging
logging.basicConfig(
    level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


def log_debug(message):
    logger.debug(message)


def log_info(message):
    logger.info(message)


def log_warning(message):
    logger.warning(message)


def log_error(message):
    logger.error(message)


def log_critical(message):
    logger.critical(message)


def log_exception(message):
    logger.exception(message)


def log_function_call(func):
    def wrapper(*args, **kwargs):
        logger.debug(
            (
                f"Llamando a la función {func.__name__} "
                f"con args: {args}, kwargs: {kwargs}"
            )
        )
        result = func(*args, **kwargs)
        logger.debug(f"Función {func.__name__} retornó: {result}")
        return result

    return wrapper
