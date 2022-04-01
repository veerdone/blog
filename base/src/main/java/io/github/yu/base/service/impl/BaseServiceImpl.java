package io.github.yu.base.service.impl;

import io.github.yu.base.mapper.BaseMapper;
import io.github.yu.base.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public abstract class BaseServiceImpl<T, Q extends T, M extends BaseMapper<T, Q>>
        implements BaseService<T, Q> {
    @Autowired
    private M mapper;

    public void insert(T t) {
        this.mapper.insert(t);
    }

    public void deleteById(Long id) {
        this.mapper.deleteById(id);
    }

    public void deleteByName(String name) {
        this.mapper.deleteByName(name);
    }

    public void updateById(T t) {
        this.mapper.updateById(t);
    }

    public T getById(Long id) {
        return this.mapper.getById(id);
    }

    public T getByName(String name) {
        return this.mapper.getByName(name);
    }

    public List<T> list() {
        return this.mapper.list();
    }

    public List<T> pageList() {
        return this.mapper.pageList();
    }

    public List<T> pageListByQuery(Q query) {
        return this.mapper.pageListByQuery(query);
    }
}
