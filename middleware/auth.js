const authenticated = ({ store, redirect }) => {
  if (!store.state.authUser) return redirect("/sign-in")
}

export default authenticated
