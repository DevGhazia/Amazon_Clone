import ErrorIcon from '@mui/icons-material/Error';

interface PropsType{
  children: string;
}

const ErrorBox : React.FC<PropsType> = ({children}) => {
  return (
    <div className='p-3 mb-3 border-2 border-l-[12px] border-red-600 rounded-lg'>
        <div className='flex mb-1'>
          <ErrorIcon className='mr-1 text-red-600'/>
          <h4 className='text-lg font-semibold'>There was a problem</h4>
        </div>
        <p className='text-sm mb-1 ml-1'>{children}</p>
    </div>
  )
}

export default ErrorBox