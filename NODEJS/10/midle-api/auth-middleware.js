
exports.authenticationMidleware = authenticationMidleware = (req, res, next) => {
    console.log('Verifica se o user esta logado');
    next();
}

const verifyIsAdmin = (req, res, next) => {
    console.log('Verify if is admin');
    next();
}
exports.verifyIsAdmin = verifyIsAdmin;

const verifyIfHasWrittingPermission = (req, res, next) => {
    console.log('Verificar se tem permissoes para escrever');
    next();
}
exports.verifyIfHasWrittingPermission = verifyIfHasWrittingPermission;

exports.verifyIsAdminArray = [authenticationMidleware, verifyIsAdmin];
exports.verifyIfCanWrite = [authenticationMidleware, verifyIfHasWrittingPermission];