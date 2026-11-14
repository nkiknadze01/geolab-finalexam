import { Component } from 'react'

// თუ რომელიმე კომპონენტი ჩაიშლება, მომხმარებელი თეთრი ეკრანის ნაცვლად მიიღებს გასაგებ შეტყობინებას
export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.assign('/')
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div role="alert" className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-xl font-semibold text-slate-900">დაფიქსირდა შეცდომა</h1>
        <p className="mt-2 text-sm text-slate-500">სცადეთ გვერდის განახლება ან დაბრუნდით მთავარ გვერდზე.</p>
        <button className="btn-primary mt-6" onClick={this.handleReset}>
          მთავარ გვერდზე დაბრუნება
        </button>
      </div>
    )
  }
}
