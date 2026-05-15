export function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl font-light tracking-widest text-muted-foreground select-none">🚧</div>
        <h1 className="text-3xl font-semibold tracking-tight">Under Maintenance</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          This site is currently undergoing scheduled maintenance. Please check back soon.
        </p>
        <div className="h-px bg-border w-24 mx-auto" />
        <p className="text-sm text-muted-foreground">We appreciate your patience.</p>
      </div>
    </div>
  )
}
