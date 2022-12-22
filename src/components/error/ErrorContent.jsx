export default function ErrorContent({
  icon = 'pi-ban',
  message = 'Ops, houve um erro na exibição desta página!',
}) {
  return (
    <div className="h-full flex flex-column gap-3 align-items-center justify-content-center">
      {icon && <icon className={`pi ${icon} text-7xl`}></icon>}
      <span>{message}</span>
    </div>
  )
}
