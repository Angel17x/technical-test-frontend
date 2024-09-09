import { RootState } from "@app/core/redux/store";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

export const InitView = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  if (!token) redirect('/auth/login');

  return redirect('auth/dashboard');
}