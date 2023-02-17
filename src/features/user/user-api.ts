export const fetchUser = async (id = 1) => {
    const response = await fetch(`http://localhost:4000/users/${id}`)
    return { data: response.json() }
}
