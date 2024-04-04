const list = [
    { key: 'subAdmin', name: 'Admin User' },
    { key: 'user', name: 'User' },
]

const find = (key) => {
    let ext = list.find(itm=>itm.key == key)
    return ext
}

const name = (key) => {
    let ext = list.find(itm=>itm.key == key)
    return ext?ext.name:key
}

const rolesModel = { list, find,name }
export default rolesModel