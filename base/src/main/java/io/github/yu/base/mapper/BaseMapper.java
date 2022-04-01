package io.github.yu.base.mapper;

import java.util.List;

public interface BaseMapper<T, Q extends T> {
    void insert(T t);

    void deleteById(Long id);

    void deleteByName(String name);

    void updateById(T t);

    T getById(Long id);

    T getByName(String name);

    List<T> list();

    List<T> pageList();

    List<T> pageListByQuery(Q query);
}
