import { Router } from 'express';
import ensureUserAuthenticated from '@modules/users/infra/middlewares/ensureUserAuthenticated';
import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';

const routes = Router();
routes.use('/appointments', ensureUserAuthenticated, appointmentsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordRoutes);

export default routes;
