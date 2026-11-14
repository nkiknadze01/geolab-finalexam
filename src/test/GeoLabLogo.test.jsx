import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import GeoLabLogo from '../components/GeoLabLogo'

describe('GeoLabLogo', () => {
  it('links to the GeoLab website in a new tab', () => {
    render(<GeoLabLogo />)
    const link = screen.getByRole('link', { name: /GeoLab/ })
    expect(link).toHaveAttribute('href', 'https://geolab.edu.ge/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(screen.getByAltText('GeoLab-ის ლოგო')).toBeInTheDocument()
  })
})
