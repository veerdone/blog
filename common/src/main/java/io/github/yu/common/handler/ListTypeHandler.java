package io.github.yu.common.handler;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ListTypeHandler implements TypeHandler<List> {
    @Override
    public void setParameter(PreparedStatement preparedStatement, int i, List integers, JdbcType jdbcType) throws SQLException {
        StringBuilder builder = new StringBuilder();
        for (int i1 = 0; i1 < integers.size(); i1++) {
            if (i1 == integers.size() - 1) {
                builder.append(integers.get(i1));
                break;
            }
            builder.append(integers.get(i1)).append(",");
        }
        preparedStatement.setString(i, builder.toString());
    }

    @Override
    public List getResult(ResultSet resultSet, String s) throws SQLException {
        String result = resultSet.getString(s);
        if (result != null) {
            return Arrays.asList(result.split(","));
        }
        return Collections.emptyList();
    }

    @Override
    public List getResult(ResultSet resultSet, int i) throws SQLException {
        String result = resultSet.getString(i);
        if (result != null) {
            return Arrays.asList(result.split(","));
        }
        return Collections.emptyList();
    }

    @Override
    public List getResult(CallableStatement callableStatement, int i) throws SQLException {
        String result = callableStatement.getString(i);
        if (result != null) {
            return Arrays.asList(result.split(","));
        }
        return Collections.emptyList();
    }
}
