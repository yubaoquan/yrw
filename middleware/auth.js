export default function ({ store, redirect, route }) {
  const { user } = store.state.user;
  const needLogin = ['/settings', '/editor'].includes(route.path);
  if (!user && needLogin) {
    redirect('/');
  }

  const needToHome = ['/login', '/register'].includes(route.path);
  if (user && needToHome) {
    redirect('/');
  }
}
