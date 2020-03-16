export default function ({ store, redirect }) {
  if (store.state.auth.user.roleId !== 1) {
    return redirect('/')
  }
}
