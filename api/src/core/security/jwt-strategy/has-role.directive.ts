import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';
import { ForbiddenException } from '@nestjs/common';

// reference from https://www.apollographql.com/docs/apollo-server/schema/creating-directives/#enforcing-access-permissions
export class HasRoleDirective extends SchemaDirectiveVisitor {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	visitObject(type) {
		this.ensureFieldsWrapped(type);
		// eslint-disable-next-line no-param-reassign,no-underscore-dangle
		type._requiredAuthRole = this.args.requires;
	}

	// Visitor methods for nested types like fields and arguments
	// also receive a details object that provides information about
	// the parent and grandparent types.
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	visitFieldDefinition(field, details) {
		this.ensureFieldsWrapped(details.objectType);
		// eslint-disable-next-line no-param-reassign,no-underscore-dangle
		field._requiredAuthRole = this.args.requires;
	}

	ensureFieldsWrapped(objectType): void {
		// Mark the GraphQLObjectType object to avoid re-wrapping:
		// eslint-disable-next-line no-underscore-dangle
		if (objectType._authFieldsWrapped) return;

		// eslint-disable-next-line no-param-reassign,no-underscore-dangle
		objectType._authFieldsWrapped = true;

		const fields = objectType.getFields();

		Object.keys(fields).forEach((fieldName) => {
			const field = fields[fieldName];
			const { resolve = defaultFieldResolver } = field;

			field.resolve = async function (...args) {
				// Get the required Role from the field first, falling back
				// to the objectType if no Role is required by the field:

				const requiredRoles: string[] =
					// eslint-disable-next-line no-underscore-dangle
					field._requiredAuthRole || objectType._requiredAuthRole;

				if (!requiredRoles) {
					return resolve.apply(this, args);
				}

				const context = args[2];
				const userRoles = context.req.user.user.roles;
				const roleNames = userRoles.map((x) => x.name) as string[];

				console.log(userRoles);
				console.log(requiredRoles);
				console.log(roleNames);

				if (
					!requiredRoles.some((requireRole) =>
						roleNames.includes(requireRole),
					)
				) {
					throw new ForbiddenException('not this shit');
				}

				return resolve.apply(this, args);
			};
		});
	}
}
