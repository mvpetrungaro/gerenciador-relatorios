import { ProgressSpinner } from 'primereact/progressspinner'

export default function Loading() {
  return (
    <div className="absolute m-auto w-5rem h-5rem top-0 right-0 bottom-0 left-0">
      <ProgressSpinner className="w-5rem h-5rem" />
    </div>
  )
}
