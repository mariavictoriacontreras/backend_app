import { Request, Response, NextFunction } from 'express'

export const validateRole = (allowedRoleIds: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoleId = req.user?.rol?.idRol
    // console.log(req);
    if (!userRoleId || !allowedRoleIds.includes(userRoleId)) {
      return res.status(403).json({ error: 'No autorizado' })
    }

    next()
  }
}
