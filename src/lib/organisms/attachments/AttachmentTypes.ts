export type AttachableEntity<ENTITY_TYPE> = {
  name: string;
  id: string;
  type: ENTITY_TYPE;
  disableDetach?: boolean;
};

export enum AttachmentAction {
  ADD,
  REMOVE,
}

export type AttachmentOperation<ENTITY_TYPE> = {
  action: AttachmentAction;
  entity: AttachableEntity<ENTITY_TYPE>;
};
