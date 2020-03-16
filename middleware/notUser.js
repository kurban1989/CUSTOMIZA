export default function ({ store, redirect }) {
  if (store.state.auth.user.roleId === 3) {
    return redirect('/')
  }
}
