import {Entity} from "@/features/entity/entityTypes.ts";
import {EntityAction} from "@/features/entityAction/entityActionTypes.ts";
import UrlAction from "@/features/entityAction/UrlAction.tsx";
import ThrobbedIcon from "@/components/icons/ThrobbedIcon.tsx";

type Props = {
  entity: Entity,
  loading: boolean,
}

export default function EntityActions({entity, loading}: Props) {

  function buildAction(action: EntityAction) {
    switch (action.component) {
      case 'UrlAction':
        return (
          <UrlAction
            key={action.entityAction}
            action={action}
            className="mt-2"
          />
        );
    }
  }

  function render() {
    if (loading) {
      return (
        <ThrobbedIcon/>
      )
    }

    return (
      entity.entityActions.map((action: EntityAction) => buildAction(action))
    )
  }


  return (
    render()
  )

}