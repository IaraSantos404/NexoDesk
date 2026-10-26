import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  nome: z.string().min(1, 'Informe o nome'),
  email: z.email('Informe um e-mail válido'),
})

type FormData = z.infer<typeof schema>

// function MeuFormulario() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   })

//   function onSubmit(data: FormData) {
//     console.log(data)
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register('nome')} />
//       {errors.nome && <span>{errors.nome.message}</span>}

//       <input {...register('email')} />
//       {errors.email && <span>{errors.email.message}</span>}

//       <button type="submit">Enviar</button>
//     </form>
//   )
// }