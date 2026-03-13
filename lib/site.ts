const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || ""

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return path
  }

  return publicBasePath ? `${publicBasePath}${path}` : path
}

