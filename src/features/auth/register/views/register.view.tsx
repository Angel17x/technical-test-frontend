import { useSelector } from "react-redux";
import { useAppDispatch } from "@app/core/hooks/hooks"
import { RootState } from "@app/core/redux/store";
import { IUser } from "@app/shared/interfaces";
import {
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
  Select,
  Option,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { registerThunk } from "../reducers/register.reducer";
import { CustomModal } from "@app/shared/components";
import { hideModal } from "../reducers/register.reducer";
// import { redirect } from "react-router-dom";

export const RegisterView: React.FC = () => {
  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<IUser>();
  const dispatch = useAppDispatch();
  const { loading, error, user, modalShow } = useSelector((state: RootState) => state.register);

  const onSubmit = (data: IUser) => {
    console.log(data);
    dispatch(registerThunk(data));
  };


  return (
    <>
      <CustomModal
        open={!user && modalShow}
        role="error"
        title="Error"
        body={error ?? "Error al registrar usuario"}
        textButton="Regresar"
        callback={() => {
          console.log('regresar error!!!')
          dispatch(hideModal());
        }}
      />
      <CustomModal
        open={user !== undefined && modalShow}
        role="info"
        title=""
        body={"Usuario registrado con éxito"}
        textButton="Regresar"
        callback={() => {
          console.log('regresar')
          dispatch(hideModal());
        }}
      />
      <div className="flex justify-center items-center h-screen flex-col">
        <div color="white" className="shadow-lg shadow-gray-400 max-w-md p-8 rounded-xl">
          <Typography variant="h4" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Registrarse
          </Typography>
          <Typography color="gray" className="mt-1 font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            ¡Un placer conocerte! Introduce tus datos para registrarte.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <div>
                <Input
                  {...register('name', {
                    required: "Debe ingresar un nombre válido",
                    minLength: 2
                  })}
                  disabled={loading}
                  label="Nombre"
                  size="lg"
                  placeholder="nombre"
                  error={errors.email != undefined}
                  onPointerEnterCapture={(e: any) => { return e }}
                  onPointerLeaveCapture={(e: any) => { return e }}
                  crossOrigin={(e: any) => { return e }} />
                <div className="text-red-500 text-sm ps-4 pt-1">
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
              </div>
              <div>
                <Input
                  {...register('lastname', {
                    required: "Debe ingresar un apellido válido",
                    minLength: 2
                  })}
                  disabled={loading}
                  label="Apellido"
                  size="lg"
                  placeholder="apellido"
                  error={errors.email != undefined}
                  onPointerEnterCapture={(e: any) => { return e }}
                  onPointerLeaveCapture={(e: any) => { return e }}
                  crossOrigin={(e: any) => { return e }} />
                <div className="text-red-500 text-sm ps-4 pt-1">
                  {errors.lastname && <p>{errors.lastname.message}</p>}
                </div>
              </div>
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
              <div>
                <Select
                  {...register('role', {
                    required: "Debe seleccionar un role",
                  })}
                  disabled={loading}
                  variant="outlined"
                  error={errors.role != undefined}
                  label="Role"
                  placeholder="Role de usuario"
                  onPointerEnterCapture={(e: any) => e}
                  onPointerLeaveCapture={(e: any) => e}
                  onChange={(e) => {
                    if (e !== undefined) {
                      setError('role', {});
                      setValue("role", e)
                    }
                  }}
                >
                  <Option value="ADMIN">Usuario Administrador</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="EMPLOYEE">Empleado</Option>
                </Select>
                <div className="text-red-500 text-sm ps-4 pt-1">
                  {errors.role && <p>{errors.role.message}</p>}
                </div>
              </div>
            </div>
            <Checkbox
              disabled={loading}
              color={errors.terms && errors.terms.message ? "red" : "gray"}
              {...register('terms', {
                required: "acepte los terminos y condiciones",
              })}
              label={<Typography
                variant="small"
                color={errors.terms ? "red" : "gray"}
                className="flex items-center font-normal"
                placeholder={(e: any) => e}
                onPointerEnterCapture={(e: any) => e}
                onPointerLeaveCapture={(e: any) => e}>
                ¿Acepta los
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;términos y condiciones?
                </a>
              </Typography>}
              containerProps={{ className: "-ml-2.5" }}
              onPointerEnterCapture={(e: any) => e}
              onPointerLeaveCapture={(e: any) => e}
              crossOrigin={(e: any) => e} >

            </Checkbox>
            <Button
              disabled={loading}
              type="submit"
              className="mt-6 text-center flex justify-center items-center"
              fullWidth
              placeholder={""}
              onPointerEnterCapture={(e: any) => e}
              onPointerLeaveCapture={(e: any) => e}>
              {loading &&
                <Spinner
                  onPointerEnterCapture={(e: any) => e}
                  onPointerLeaveCapture={(e: any) => e} />
              }
              {!loading && 'Registrarse'}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

