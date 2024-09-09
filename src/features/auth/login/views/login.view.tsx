import { useSelector } from "react-redux";
import { useAppDispatch } from "@app/core/hooks/hooks"
import { RootState } from "@app/core/redux/store";
import { authThunk } from "../reducers/auth.reducer";
import {
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { hideModal } from "../reducers/auth.reducer";
import { Link } from "react-router-dom";
import { ILogin } from "../interfaces";
import { CustomModal } from "@app/shared/components";

export const LoginView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, modalShow, error } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>();

  const onSubmit = (data: ILogin) => {
    dispatch(authThunk(data))
    // dispatch(authThunk(data));
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <CustomModal
          open={modalShow}
          role="error"
          title="Error"
          body={error ?? "Error al registrar usuario"}
          textButton="Regresar"
          callback={() => {
            dispatch(hideModal());
          }}
        />
        <div color="white" className="shadow-lg shadow-gray-400 max-w-md p-8 rounded-xl">
          <Typography
            variant="h4"
            color="blue-gray"
            placeholder={""}
            onPointerEnterCapture={(e: any) => e}
            onPointerLeaveCapture={(e: any) => e}>
            Iniciar sesión
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1 flex flex-col gap-6">
              <div>
                <Input
                  {...register('email', {
                    required: "Debe ingresar un correo electrónico válido",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Debe ingresar un correo electrónico válido",
                    },
                  })}
                  disabled={loading}
                  label="Correo electrónico"
                  size="lg"
                  placeholder="name@mail.com"
                  error={errors.email != undefined}
                  onPointerEnterCapture={(e: any) => { return e }}
                  onPointerLeaveCapture={(e: any) => { return e }}
                  crossOrigin={(e: any) => { return e }} />
                <div className="text-red-500 text-sm ps-4 pt-1">
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <Input
                  {...register('password', {
                    required: "Debe ingresar una contraseña válida",
                    minLength: {
                      value: 8,
                      message: "Debe ingresar una contraseña de al menos 8 caracteres",
                    },

                  })}
                  disabled={loading}
                  type="password"
                  size="lg"
                  error={errors.password != undefined}
                  label="contraseña"
                  placeholder="********"
                  onPointerEnterCapture={(e: any) => e}
                  onPointerLeaveCapture={(e: any) => e}
                  crossOrigin={(e: any) => e} />
                <div className="text-red-500 text-sm ps-4 pt-1">
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="mt-6 text-center flex justify-center items-center"
              fullWidth
              placeholder={""}
              onPointerEnterCapture={(e: any) => e}
              onPointerLeaveCapture={undefined}>
              {loading &&
                <Spinner
                  onPointerEnterCapture={(e: any) => e}
                  onPointerLeaveCapture={(e: any) => e} />
              }
              {!loading && 'Ingresar'}
            </Button>
            <Typography
              color="gray"
              className="mt-4 text-center font-normal"
              placeholder={""}
              onPointerEnterCapture={(e: any) => e}
              onPointerLeaveCapture={(e: any) => e}>
              ¿No posees cuenta? {" "}
              <Link to="/auth/register" className="font-medium text-gray-900">
                Registrarse
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </>
  )
}

