export default function({store, redirect}) {
    if(!store.getters.getAuth) {
        return redirect('/')
    }
}