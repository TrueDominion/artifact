interface HorizontalRuleProps {
  width?: string
}

export default function HorizontalRule({ width = '48px' }: HorizontalRuleProps) {
  return (
    <div
      style={{
        width,
        height: '1px',
        backgroundColor: 'rgba(45, 45, 45, 0.15)',
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  )
}
