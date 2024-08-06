export type AttachableEntity<
  ENTITY_TYPE,
  ENTITY extends Record<string, unknown> = Record<string, unknown>,
> = {
  name: string;
  id: string;
  type: ENTITY_TYPE;
  disableDetach?: boolean;
  completeEntity?: ENTITY;
};

export enum AttachmentAction {
  ADD,
  REMOVE,
}

export type AttachmentOperation<
  ENTITY_TYPE,
  ENTITY extends Record<string, unknown> = Record<string, unknown>,
> = {
  action: AttachmentAction;
  entity: AttachableEntity<ENTITY_TYPE, ENTITY>;
};
