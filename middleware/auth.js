const authenticated = ({ store, redirect }) => {
  if (!store.state.authAdmin) return redirect("/sign-in")
}

export default authenticated
