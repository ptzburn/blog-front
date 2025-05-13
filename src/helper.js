const formatCreatedAt = createdAt => {
  const date = new Date(createdAt)
  return date
    .toLocaleString('en-GB', {
      timeZone: 'Europe/Helsinki',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    .replace(/,/, '')
}

export { formatCreatedAt }
