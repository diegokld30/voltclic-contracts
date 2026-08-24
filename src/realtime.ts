/**
 * Contratos del canal Realtime (Socket.IO backend -> navegadores).
 * NUNCA se mezcla con el canal OCPP (cargadores). Este canal es solo lectura para la UI.
 */
import { ChargePointStatus, ChargingSessionStatus } from './enums.js';

/** Nombres de evento Socket.IO. Namespace por tenant al conectar (ver gateway). */
export const RealtimeEvent = {
  ConnectorStatus: 'connector.status',
  SessionProgress: 'session.progress',
  ChargePointOnline: 'chargepoint.online',
  ChargePointOffline: 'chargepoint.offline',
} as const;

export interface ConnectorStatusEvent {
  chargePointId: string;
  connectorId: number; // 0 = CP completo
  status: ChargePointStatus;
  at: string; // ISO
}

/** Progreso en vivo hacia la PWA del usuario durante una carga. */
export interface SessionProgressEvent {
  sessionId: string;
  status: ChargingSessionStatus;
  energyWh: number;
  powerW: number;
  estimatedCostCents: number;
  holdCents: number;
  at: string; // ISO
}
