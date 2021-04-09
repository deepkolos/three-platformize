import { OBJLoader2Parser } from '../../OBJLoader2Parser.js';
import { WorkerRunner, DefaultWorkerPayloadHandler } from './WorkerRunner.js';

/**
 * @author Kai Salmen / https://kaisalmen.de
 * Development repository: https://github.com/kaisalmen/WWOBJLoader
 */

new WorkerRunner( new DefaultWorkerPayloadHandler( new OBJLoader2Parser() ) );
