/**
 * ALLPS AI — Example Mockup
 * ─────────────────────────────────────
 * Replace this with your actual mockup component.
 * Each mockup file must have a default export that renders a complete React component.
 * This file has NO dependencies on other mockup files.
 */
import React from 'react'

export default function ExampleMockup() {
  return (
    <div style={{
      minHeight: '100%',
      background: '#0D1220',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      color: '#F0F4FF',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏔</div>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 28, fontWeight: 800,
          marginBottom: 12,
          background: 'linear-gradient(135deg, #00C2A8, #6366F1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Allps AI Product Mockup
        </h2>
        <p style={{ color: '#8892A4', lineHeight: 1.6, fontSize: 14 }}>
          This is a placeholder. Replace this file with your actual mockup component.
          Each file in the <code style={{ color: '#00C2A8' }}>src/mockups/</code> folder
          becomes a standalone, independently launchable prototype.
        </p>
      </div>
    </div>
  )
}
