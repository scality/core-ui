export type AttachableEntity<ENTITY_TYPE> = {
  name: string;
  id: string;
  type: ENTITY_TYPE;
  disableDetach?: boolean;
};

export enum AttachmentAction {
  ADD,
  REMOVE,
  RESET_DESIRED_ATTACHED_ENTITIES,
}

export type AttachmentOperation<ENTITY_TYPE> = {
  action: AttachmentAction;
  entity: AttachableEntity<ENTITY_TYPE>;
};
