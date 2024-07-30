import { Navabar } from "../components";
import useAuthStore from "../store/auth.store";

function Hero() {
  const { isLoading, user, error } = useAuthStore()
  console.log(user);


  return <>
    <Navabar />
  </>;
}

export default Hero;
