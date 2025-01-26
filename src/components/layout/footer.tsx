export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-4 py-8 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">IACL System</h3>
          <p className="text-sm text-muted-foreground">
            Performance management made simple
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">Product</h4>
            <nav className="flex flex-col gap-2">
              <a href="/features" className="text-sm text-muted-foreground hover:underline">
                Features
              </a>
              <a href="/pricing" className="text-sm text-muted-foreground hover:underline">
                Pricing
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">Company</h4>
            <nav className="flex flex-col gap-2">
              <a href="/about" className="text-sm text-muted-foreground hover:underline">
                About
              </a>
              <a href="/contact" className="text-sm text-muted-foreground hover:underline">
                Contact
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">Legal</h4>
            <nav className="flex flex-col gap-2">
              <a href="/privacy" className="text-sm text-muted-foreground hover:underline">
                Privacy
              </a>
              <a href="/terms" className="text-sm text-muted-foreground hover:underline">
                Terms
              </a>
            </nav>
          </div>
        </div>
      </div>
      
      <div className="border-t">
        <div className="container flex justify-between py-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} IACL System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 