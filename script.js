const api = "api.json"

const $root = document.getElementById("root")

const getApi = async () => {
    const response = await fetch(api)
    const data = await response.json()
    for ( let i = 0; i < data.teste.length; i++){
        $root.innerHTML = data.teste[i].chave
    }
    return data
    }
getApi()

const postApi = async () => {
    const response = await fetch(api , {
        method: 'POST',
        body: JSON.stringify({
            "chave": "outro valor"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    return data
}

postApi()