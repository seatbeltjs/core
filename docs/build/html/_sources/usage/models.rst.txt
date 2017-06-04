Models
=================================================================

You can creates models from any folder within your project.  Currently waterline is supported but other orms should be supported in the future.

#########
Waterline
#########

********************************
Initialized waterline ORM plugin
********************************

In order to initialize waterline you will first have to add it to the plugins class of the server you are using the following format where your server file is located.

.. code-block:: typescript

  @DRestify()
  export class Server implements IServer {
    public plugins = [
      waterlinePlugin({
        adapters: {
          memory: require('sails-memory')
        },
        connections: {
          default: {
            adapter: 'memory',
            schema: true
          }
        }
      })
    ];
  }

*************************
Create Model In Waterline
*************************

.. code-block:: typescript

  import { DModel } from '@seatbelt/orm-waterline';

  @DModel({
    connection: 'default',
    identity: 'test',
    attributes: {
      firstName: 'string',
      lastName: 'string'
    }
  })
  export class Test {}

****************************************************
Access Models From Waterline from a route or service
****************************************************

From a Route
""""""""""""

.. code-block:: typescript

  import { DService, DRoute, DPolicy, DValidateRequest, IRoute, IController} from '@seatbelt/core';

  @DRoute({
    path: '/',
    type: ['GET', 'POST']
  })
  export class HomeRoute implements IRoute {
    public models: any;
    public controller (controller: IController) {
      return this.models.test.create(controller.params)
      .then(results => {
        return controller.send({ status: 200, json: controller });
      })
      .catch(err => {
        return controller.send({ status: 500, json: err });
      });
    }
  }
