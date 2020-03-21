export default function ClientSide({ children }) {
  return typeof window !== 'undefined' ? children : null
}
