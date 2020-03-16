export default function ({ store, redirect }) {
  if (store.state.auth.user.roleId !== 2) {
    return redirect('/')
  }
}
