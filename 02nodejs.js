/*
0 obter um usuario
1 obter o numero de telefone de um usuario a partir do seu id
2 obter o endereco do usuario pelo id
*/

//importamos um módulo interno do node.js

const util = require ('util')
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '1199002',
                ddd: 11
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback (null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);

}

// 1 passo adicionar a palavra async => ativar a promise
main()
async function main () {
    try{
        console.time('medida-promise');
        const usuario = await obterUsuario();
        //const telefone = await obterTelefone(usuario.id);
        //const endereco = await obterEnderecoAsync(usuario.id);

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ]);

        const telefone = resultado[0];
        const endereco = resultado[1];

        console.log({
            Nome: usuario.nome,
            DDD: telefone.ddd,
            telefone: telefone.telefone,
            Endereco: endereco.rua,
            NEndereco: endereco.numero
        })

        console.timeEnd('medida-promise');
    }
    catch(error){
        console.error('Deu ruim', error)
    }
}

// para manipular o sucesso usamo a função .then
// já para o erro, usar o .catch