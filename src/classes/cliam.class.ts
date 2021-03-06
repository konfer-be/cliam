import { Emitter } from './../services/emitter.service';
import { Container } from './../services/container.service';
import { Event } from './../types/types/event.type';
import { IPayload } from './../types/interfaces/IPayload.interface';
import { SendingResponse } from './sending-response.class';
import { SendingError } from './sending-error.class';

/**
 * @summary Main class of cliam project. The Cliam class act as entry point and open wrapped methods such subscribe and emit.
 *
 * @public
 */
class Cliam {

  /**
   * @description
   */
  private static instance: Cliam = null;

  /**
   * @description
   */
  private emitter: Emitter;

  private constructor(emitter: Emitter) {
    this.emitter = emitter;
    this.subscribe('default');
    this.subscribe('event.subscribe');
    this.subscribe('event.unsubscribe');
    this.subscribe('event.updated');
    this.subscribe('user.bye');
    this.subscribe('user.confirm');
    this.subscribe('user.contact');
    this.subscribe('user.invite');
    this.subscribe('user.progress');
    this.subscribe('user.survey');
    this.subscribe('user.welcome');
    this.subscribe('order.invoice');
    this.subscribe('order.progress');
    this.subscribe('order.shipped');
    this.subscribe('password.request');
    this.subscribe('password.updated');
  }

  /**
   *
   * @param emitter
   */
  static get(emitter): Cliam {
    if (!Cliam.instance) {
      Cliam.instance = new Cliam(emitter);
    }
    return Cliam.instance;
  }

  /**
   * @description
   *
   * @param event
   */
  subscribe(event: Event|string) {
    this.emitter.subscribe(event);
  }

  /**
   * @description
   */
  async emit(event: Event|string, payload: IPayload): Promise<SendingResponse|SendingError> {
    return this.emitter.emit(event, payload);
  }
}

const cliam = Cliam.get( Emitter.get( Container.configuration ) ) as { emit: (event: Event|string, payload: IPayload) =>  Promise<SendingResponse | SendingError>, subscribe: (event: Event|string) => void };

export { cliam as Cliam }