Policies
=================================================================

Creating a Policy
#################

Policies can be created in any folder of your project by using the format below.  Params sent by the route call can be accessed from controller.params in the same way they can be accessed from routes.

.. code-block:: typescript

  import { DPolicy, IPolicy, IPolicyController } from '@seatbelt/core';

  @DPolicy()
  export class NewPolicy implements IPolicy {
    public controller (controller: IPolicyController) {
      console.log('policy working');
      return controller.next();
    }
  }

Using a Policy
##############

After creation the policy can be used simply by calling the Policy Decorator directly before declaring your controller.

.. code-block:: typescript

  import { DService, DRoute, DPolicy, DValidateRequest, IRoute, IController} from '@seatbelt/core';

  @DRoute({
    path: '/',
    type: 'GET'
  })
  export class HomeRoute implements IRoute {
    @DPolicy('NewPolicy')
    public controller (controller: IController) {
      this.services.Poke.poke();
      return controller.send({ status: 200, json: controller });
    }
  }
