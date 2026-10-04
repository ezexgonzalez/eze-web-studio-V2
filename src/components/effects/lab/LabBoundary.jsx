import { Component } from 'react'

export class LabBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error, info) { this.props.onError(this.props.system, new Error(`${error.stack || error.message}\n${info.componentStack}`)) }
  render() { return this.state.failed ? null : this.props.children }
}
