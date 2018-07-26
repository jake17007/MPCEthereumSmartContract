import os, os.path

# Taken from https://stackoverflow.com/a/600612/119527
def mkdir_p(path):

    try:
        os.makedirs(path)
    except OSError as exc: # Python >2.5
        if exc.errno == 17 and os.path.isdir(path):
            pass
        else: raise


def safe_open_w(path):
    ''' Open "path" for writing, creating any parent directories as needed.
    '''
    mkdir_p(os.path.dirname(path))
    return open(path, 'w')
