"""empty message

Revision ID: 38e278e60d3a
Revises: a562aa588d5b
Create Date: 2023-05-15 07:38:03.799710

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '38e278e60d3a'
down_revision = 'a562aa588d5b'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('messages', sa.Column('role', sa.String(length=25), nullable=False))
    op.drop_constraint('messages_admin_id_fkey', 'messages', type_='foreignkey')
    op.drop_constraint('messages_teacher_id_fkey', 'messages', type_='foreignkey')
    op.drop_constraint('messages_student_id_fkey', 'messages', type_='foreignkey')
    op.drop_column('messages', 'teacher_id')
    op.drop_column('messages', 'admin_id')
    op.drop_column('messages', 'student_id')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('messages', sa.Column('student_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('messages', sa.Column('admin_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('messages', sa.Column('teacher_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('messages_student_id_fkey', 'messages', 'students', ['student_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('messages_teacher_id_fkey', 'messages', 'teachers', ['teacher_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('messages_admin_id_fkey', 'messages', 'admins', ['admin_id'], ['id'], ondelete='CASCADE')
    op.drop_column('messages', 'role')
    # ### end Alembic commands ###
