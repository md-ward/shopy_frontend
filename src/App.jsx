import AppRouter from './router'
import useRegistering from './user_registering/store/useRegisteringStore'
import RegisteringPage from './user_registering/view/registeringPage';

function App() {
  const { isDialogOpen, isLogedIn } = useRegistering();
  return (
    <>
      {(isDialogOpen && !isLogedIn) && <RegisteringPage />}

      <AppRouter />

    </>
  )
}

export default App
